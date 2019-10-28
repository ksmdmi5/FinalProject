import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolService } from 'src/app/services/tool.service';
import { Tool } from 'src/app/models/tool';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  editSkill = null;
  selected = null;
  showComplete = false;
  urlSkillId: string;
  skills: Skill[] = [];

  newSkill = new Skill();

  constructor(private skillService: SkillService,
              private datePipe: DatePipe,
              private currentRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.urlSkillId = this.getCommandLineParameter();
    this.reloadSkills();
  }

  getCommandLineParameter(): string {
    let idString = '';
    if (this.currentRoute.snapshot.paramMap.get('id')) {
      idString =  this.currentRoute.snapshot.paramMap.get('id');
    }
    return idString;
  }

  showTotalSkills(): number {
    const total = this.skills.length;
    return total;
  }

  displaySkill(skill: Skill) {
    this.selected = skill;
  }

  displayTable() {
    this.selected = null;
  }

  addSkill(form: NgForm) {
    this.newSkill = new Skill();

    // TODO need logic entered here.

    this.skillService.create(this.newSkill).subscribe(
      () => {
        this.reloadSkills();
      },
      err => {
        console.error('skillComponent - addSkill()');
        console.error(err);
      }
    );
    form.reset();
  }

  setEditSkill() {
    this.editSkill = Object.assign({}, this.selected);
  }

  cancelEditSkill() {
    this.editSkill = null;
  }

  updateSkill(id: number, editedSkill: Skill) {

    // TODO logic needs to be entered here

    this.skillService.update(id, editedSkill).subscribe(
      () => {
        this.reloadSkills();
      },
      err => {
        console.error('skillComponent - updateSkill()');
        console.error(err);
      }
    );
    this.editSkill = null;
    this.selected = null;
  }

  deleteSkill(id: number) {
    this.skillService.destroy(id).subscribe(
      () => {
        this.reloadSkills();
      },
      err => {
        console.error('skillComponent - deleteSkill()');
        console.error(err);
      }
    );
    this.reloadSkills();
  }

  reloadSkills() {
    this.skillService.index().subscribe(
      lifeIsGood => {
        this.skills = lifeIsGood;
        if (this.urlSkillId) {
          this.selected = this.skills.find((data => data.id === Number(this.urlSkillId)));
          if (!this.selected) {
            this.router.navigateByUrl('**');
          }
        }
      },
      lifeIsBad => {
        console.error('Error in SkillComponent.reloadSkills()');
        console.error(lifeIsBad);
      }
    );
  }


  // TODO we dont need this but could utilize in a different way.
  // checkTotalSkills(): string {
  //   let classColor = '';
  //   if (this.showTotalSkills() >= 10) {
  //     classColor = 'badge badge-pill badge-danger';
  //   } else if (this.showTotalSkills() >= 5) {
  //     classColor = 'badge badge-pill badge-warning';
  //   } else if (this.showTotalSkills() < 5) {
  //     classColor = 'badge badge-pill badge-success';
  //   }
  //   return classColor;
  // }
}
