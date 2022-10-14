import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private readonly FB: FormBuilder,
               private readonly validatosSvc:ValidadoresService ) {
    this.crearFormulario();

    this.cargarDataFormulario();

    this.crearListeners();


  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched  
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }

  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return ( pass1 === pass2 ) ? false:true;
  }

  crearListeners() {
    this.forma.valueChanges.subscribe( valor => {
      console.log(valor);
      
    });

    this.forma.statusChanges.subscribe( status => console.log({status}))
  }


  crearFormulario() {

    this.forma = this.FB.group({
      nombre  : ['', [Validators.required, Validators.minLength(5)] ],
      apellido: ['', [Validators.required, this.validatosSvc.noHerrera] ],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]  ],
      usuario : ['', , this.validatosSvc.existeUsuario],
      pass1   : ['', Validators.required],
      pass2   : ['', Validators.required],
      direccion: this.FB.group({
        distrito: ['', Validators.required],
        ciudad  : ['', Validators.required]
      }),
      pasatiempos: this.FB.array([])
    },{
      validators: this.validatosSvc.passwordIguales('pass1','pass2')
    });

  }

  cargarDataFormulario() {
    this.forma.reset({
      nombre: 'Camilo',
      apellido: 'Artunduaga',
      correo: 'camilinpb@gmail.com',
      pass1 : '123',
      pass2 : '123',
      direccion: {
        distrito: 'Cundinamarca',
        ciudad: 'Madrid'
      }
    });


  }

  agregarPasatiempo() {
    this.pasatiempos.push( this.FB.control('Nuevo Elemento', Validators.required) )
  }

  borrarPasatiempo( i: number ) {
    this.pasatiempos.removeAt(i)
  }

  guardar() {
    console.log(this.forma);

    if(this.forma.invalid) {
      
      return Object.values( this.forma.controls ).forEach(control => {

        if( control instanceof FormGroup ) {

          Object.values( control.controls ).forEach(control => control.markAsTouched)

        }else {
          control.markAsUntouched();
        }
    
      });

    }

    //Posteo de la informacion

    this.forma.reset({
      nombre: 'Sin nombre'
    });
    
  }

}
