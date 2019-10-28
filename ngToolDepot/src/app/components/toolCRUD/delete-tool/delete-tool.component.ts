import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tool } from 'src/app/models/tool';
import { HttpClient } from '@angular/common/http';
import { ToolService } from 'src/app/services/tool.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-delete-tool',
  templateUrl: './delete-tool.component.html',
  styleUrls: ['./delete-tool.component.scss']
})
export class DeleteToolComponent implements OnInit {
  @Input() user: User;

  @Input() tool: Tool;
  private url = environment.baseUrl + 'api/tool';
  toolToBeDeleted: Tool = new Tool();
  constructor(
    private toolService: ToolService,
    private http: HttpClient,
    private auth: AuthService
    ) { }

  ngOnInit() {

  }

  delete() {
    this.toolService.destroy(this.tool.id).subscribe(
      () => {
        console.log('Success deleting');
        location.reload();
      },
      err => {
        console.error('delete-tool - delete()');
        console.error(err);
      }
    );
  }
}
