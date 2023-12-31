import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
let formulario = document.querySelector("form");

const calendarEl = document.getElementById('agenda')
const calendar = new Calendar(calendarEl, {
  plugins: [
    interactionPlugin,
    dayGridPlugin
  ],
  initialView: 'dayGridMonth',
  locale: "es",
  editable: true,
  events: "http://localhost/prsme/sme/public/evento/mostrar",

  dateClick: function (info) {
    formulario.reset();
    formulario.start.value = info.dateStr;
    formulario.end.value = info.dateStr;
    $("#evento").modal("show");
  },
  eventClick: function (info) {
    var evento = info.event;
    console.log(evento);
    axios.post("http://localhost/prsme/sme/public/evento/editar/" + info.event.id).
      then(
        (respuesta) => {
          formulario.id.value = respuesta.data.id;
          formulario.maquina_id.value = respuesta.data.maquina_id;
          formulario.tecnico_id.value = respuesta.data.tecnico_id;
          formulario.start.value = respuesta.data.start;
          formulario.end.value = respuesta.data.end;
          $("#evento").modal("show");
        }
      ).catch(
        error => {
          if (error.response) {
            console.log(error);
          }
        }
      )
  }
})


calendar.render();

//para guardar
document.getElementById("btnGuardar").addEventListener("click", function () {
  enviarDatos("http://localhost/prsme/sme/public/evento/agregar");
});
//para eliminar
document.getElementById("btnEliminar").addEventListener("click", function () {
  enviarDatos("http://localhost/prsme/sme/public/evento/borrar/" + formulario.id.value);
});
//para modificar
document.getElementById("btnModificar").addEventListener("click", function () {
  enviarDatos("http://localhost/prsme/sme/public/evento/actualizar/" + formulario.id.value);
});

function enviarDatos(url) {
  const datos = new FormData(formulario);
  console.log(datos);
  console.log("aqui esta la wea del start"+formulario.start.value);

  axios.post(url, datos).
    then(
      (respuesta) => {
        calendar.refetchEvents();
        $("#evento").modal("hide");
      }
    ).catch(
      error => {
        if (error.response) {
          console.log(error);
        }
      }
    )
}