import { Component } from '@angular/core';
import { loginService } from '../login.service';
import { ProjectsService } from '../projects.service';
import { Response } from '../response';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  myResponse!: Response;
  constructor(private loginService: loginService, private projects:ProjectsService) { };
  ngOnInit(): void {
    this.myResponse = this.loginService.myResponse;
  }
}

