import { AuthService } from 'src/app/services/auth.service';
import { Location } from "./../../models/location";
import { AddressService } from "./../../services/address.service";
import { Address } from "./../../models/address";
import { GeocodeService } from "./../../services/geocode.service";
import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Tool } from "src/app/models/tool";
import { AgmMap, InfoWindowManager, MapsAPILoader } from "@agm/core";
import { User } from "src/app/models/user";
import { Router } from '@angular/router';

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"]
})
export class SearchResultsComponent implements OnInit {
  @Input() searchResults: Tool[];
  @ViewChild(AgmMap, { static: false }) public agmMap: AgmMap;
  lat: number = 39.7392;
  lng: number = -104.9903;
  location: Location = new Location();
  savedCoordinatesMap: Map<string, Location> = new Map();
  savedCoordinatesList: Location[] = [];
  coordinates: Location[] = [];
  openInfo: boolean = false;
  hoveredTool: Tool = new Tool();
  address: Address = new Address();
  owner: User = new User();
  constructor(
    private geoService: GeocodeService,
    private addrService: AddressService,
    private authService: AuthService,
    private router: Router,
    private mapsApiLoader: MapsAPILoader
  ) {
    this.mapsApiLoader.load().then(() => {
      this.lat = 39.7392;
      this.lng = -104.9903;
    })
  }

  ngOnInit() {
    console.log(this.searchResults);
    this.savedCoordinatesMap = new Map();
  }

  ngAfterViewInit() {
    this.agmMap.triggerResize();
    this.redraw();
  }
  ngOnChanges() {
    for (let tool of this.searchResults) {
      this.savedCoordinatesList = [];
      this.addrService.getAddressOfToolOwner(tool.id).subscribe(
        data => {
          this.geoService
            .geocodeAddress(this.generateApiAddressString(data))
            .subscribe(
              data => {
                this.parseForCoordinates(data, tool, this.savedCoordinatesMap);
              },
              err => {
                console.error(err);
              }
            );
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  mouseEnter(tool: Tool) {
    this.coordinates = [];
    this.location = this.savedCoordinatesMap.get(tool.name);
    this.coordinates.push(this.location);
    this.hoveredTool = tool;
    for (let prop in this.hoveredTool) {
      if (prop === "user") {
        this.owner = this.hoveredTool[prop];
        for (let property in this.owner) {
          if (property === "address") {
            this.address = this.owner[property];
            break;
          }
        }
        break;
      }
    }
    this.openInfo = true;
  }

  parseForCoordinates(data, tool, locationMap: Map<String, Location>) {
    for (let i = 0; i < data.results.length; i++) {
      this.location.lat = data.results[i].geometry.location.lat;
      this.location.lng = data.results[i].geometry.location.lng;
      locationMap.set(tool.name, this.location);
      this.savedCoordinatesList.push(this.location);
      this.location = new Location();
    }
  }

  generateApiAddressString(addr: Address) {
    // 1600+Amphitheatre+Parkway,+Mountain+View,+CA
    var formattedString = "";
    formattedString += addr.street.split(" ").join("+");
    formattedString += ",";
    formattedString += "+" + addr.city.split(" ").join("+");
    formattedString += "+" + addr.state;
    return formattedString;
  }

  redraw() {
    this.openInfo = false;
    this.coordinates = this.savedCoordinatesList;
  }

  checkLogin(): boolean {
    if (this.authService.checkLogin()) {
      return true;
    } else {
      return false;
    }
  }

  loginRedirect(tool: Tool) {
    var str = '/login?toolId=' + tool.id;
    this.router.navigateByUrl(str);
  }

  toolTransaction(tool) {
    var str = '/toolTransaction?id=' + tool.id;
    this.router.navigateByUrl(str);
  }
}
