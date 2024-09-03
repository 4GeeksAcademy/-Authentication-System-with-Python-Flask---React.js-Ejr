import React from "react";
import "../../styles/acordeonPreguntas.css";
import DataAcordeon from "./DataAcordeon";

const AcordeonPreguntas = ({ text, isDevelop }) => {
  const preguntasDev = [
    {
      id:1,
      pregunta: "¿Cómo puedo registrarme en el sitio?",
      respuesta:
        "Puedes registrarte haciendo clic en el botón Registrarse en la esquina superior derecha de la página. Completa el formulario con tu información personal y tu experiencia laboral. ",
    },
    {
      id:2,
      pregunta: "¿Es gratuito usar la plataforma?",
      respuesta:
        "Sí, nuestra plataforma es gratuita para los solicitantes de empleo. Puedes buscar y postularte a ofertas de trabajo sin costo alguno. Sin embargo, algunas funciones premium pueden requerir una suscripción. ",
    },
    {
      id:3,
      pregunta: "¿Qué tipos de trabajos están disponibles?",
      respuesta:
        "Ofrecemos una amplia variedad de trabajos en el campo de la programación, incluyendo desarrollador front-end, back-end, full-stack, ingeniero de software, y más. Puedes filtrar las ofertas por tecnología, ubicación y nivel de experiencia.",
    },
    {
      id:4,
      pregunta: "¿Cómo puedo postularme a un trabajo?",
      respuesta:
        "Una vez que encuentres una oferta que te interese, haz clic en ella para ver los detalles. Desde ahí, podrás enviar tu currículum y una carta de presentación directamente al empleador a través de nuestra plataforma. ",
    },
    {
      id:5,
      pregunta:
        "¿Cómo puedo mejorar mis posibilidades de conseguir un trabajo?",
      respuesta:
        "Te recomendamos que optimices tu perfil, incluyendo habilidades relevantes y experiencias pasadas. También puedes personalizar tu carta de presentación para cada solicitud y preparar bien tus entrevistas.",
    },
    {
      id:6,
      pregunta: "¿Qué hago si tengo problemas para acceder a mi cuenta?",
      respuesta:
        "Si tienes problemas para acceder a tu cuenta, intenta restablecer tu contraseña usando la opción Olvidé mi contraseña en la página de inicio de sesión. Si sigues teniendo problemas, contacta a nuestro soporte técnico.",
    },
    {
      id:7,
      pregunta: "¿Qué debo hacer si tengo preguntas adicionales?",
      respuesta:
        "Si tienes más preguntas o necesitas asistencia, no dudes en contactarnos a través de nuestro formulario de contacto o por correo electrónico. Estamos aquí para ayudarte.",
    },
  ];

  const preguntasEmpleador = [
    {
      id:1,
      pregunta: "¿Cómo puedo registrar mi empresa en la plataforma?",
      respuesta:
        "Para registrar tu empresa, haz clic en el botón Registrarse en la esquina superior derecha de la página. Completa el formulario con la información de tu empresa, como nombre, dirección, y detalles de contacto. Una vez verificada la información, recibirás un correo de confirmación y podrás empezar a publicar ofertas de empleo. ",
    },
    {
      id:2,
      pregunta: "¿Es gratuito publicar ofertas de empleo?",
      respuesta:
        "Ofrecemos una opción gratuita para publicar ofertas de empleo, aunque también tenemos planes premium que incluyen beneficios adicionales, como una mayor visibilidad en la plataforma y acceso a una base de datos de candidatos.",
    },
    {
      id:3,
      pregunta: "¿Cómo publico una oferta de empleo?",
      respuesta:
        "Después de registrarte, inicia sesión en tu cuenta y dirígete a tu perfil. Desde allí, selecciona Publicar oferta y completa el formulario con los detalles del puesto, incluyendo el título, la descripción, los requisitos y la ubicación. Una vez que la oferta esté lista, podrás publicarla inmediatamente.",
    },
    {
      id:4,
      pregunta: "¿Cómo gestiono las aplicaciones recibidas?",
      respuesta:
        "Todas las aplicaciones recibidas se gestionan desde tu perfil. Desde allí, puedes revisar los candidatos, filtrarlos y comunicarte con los solicitantes.",
    },
    {
      id:5,
      pregunta:
        "¿Qué hago si tengo problemas al publicar una oferta de empleo?",
      respuesta:
        "Si tienes problemas al intentar publicar una oferta, asegúrate de que todos los campos obligatorios estén completados correctamente. Si el problema persiste, puedes contactar a nuestro equipo de soporte técnico para asistencia.",
    },
    {
      id:6,
      pregunta:
        "¿Puedo editar o eliminar una oferta de empleo después de publicarla?",
      respuesta:
        "Sí, puedes editar o eliminar una oferta en cualquier momento desde tu perfil. Simplemente selecciona la oferta que deseas modificar o eliminar y realiza los cambios necesarios.",
    },
    {
      id:7,
      pregunta:
        "¿Cómo puedo contactar al soporte técnico si tengo más preguntas?",
      respuesta:
        "Si tienes más preguntas o necesitas asistencia, no dudes en contactarnos a través de nuestro formulario de contacto o por correo electrónico. Estamos aquí para ayudarte.",
    },
  ];
  return (
    <div className="colorsAcordeon">
      <div class="alert " role="alert">
        (FAQ) Preguntas más frecuentes del {text}
      </div>
      <div className="accordion" id="acordeonExample">
      {isDevelop ? (
        <>
          {preguntasDev?.map((data, index) => (
            <DataAcordeon key={index} data={data} />
          ))}
        </>
      ) : (
        <>
          {preguntasEmpleador?.map((data, index) => (
            <DataAcordeon key={index} data={data} />
          ))}
        </>
      )}
      </div>
    </div>
  );
};

export default AcordeonPreguntas;
