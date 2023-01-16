import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListarUsuariosAdminPage } from './listar-usuarios-admin.page';

describe('ListarUsuariosAdminPage', () => {
  let component: ListarUsuariosAdminPage;
  let fixture: ComponentFixture<ListarUsuariosAdminPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarUsuariosAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarUsuariosAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
