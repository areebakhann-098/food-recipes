import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule], // <-- this is required
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  supportEmail = 'support@deliciousfood.com';
  Facebook = 'https://facebook.com/yourpage';
}
