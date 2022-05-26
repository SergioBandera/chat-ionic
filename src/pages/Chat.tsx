import { useState } from "react";
import { cameraOutline, send, documentAttachOutline } from "ionicons/icons";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  TextareaChangeEventDetail,
} from "@ionic/react";
import "./Chat.css";

interface datosMensaje {
  mensaje: string;
  hora: string;
  dia: string;
}
const Chat: React.FC = () => {
  const [mensajes, setMensajes] = useState<Array<datosMensaje>>();
  const [mensajeTexto, setMensajeTexto] = useState<datosMensaje>({
    mensaje: "",
    hora: "",
    dia: "",
  });
  

  const cogerMensaje = (event: CustomEvent<TextareaChangeEventDetail>) => {
    const data = Date().toLocaleString();
    const fecha = data.split(" ");

    setMensajeTexto({
      mensaje: event.detail.value!,
      hora: fecha[4],
      dia: fecha[0],
    });
  };

  const enviarMensaje = () => {
    if (mensajes != null) setMensajes([...mensajes!, mensajeTexto]);
    else setMensajes([mensajeTexto]);
    
  };

  const mostrarMensajes = () => {
    if (mensajes != null)
      return mensajes.map(({ mensaje, hora, dia }, index) => (
        <IonList className="caja-mensaje" key={index}>
          <p className="fecha">{dia} {hora}</p>
          <p className="mensaje">{mensaje}</p>
        </IonList>
      ));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Chat con Ionic</IonTitle>
      </IonHeader>
      <IonContent >
        <IonHeader collapse="condense">
          <IonTitle size="large">Chat</IonTitle>
        </IonHeader>
        {mostrarMensajes()}
      </IonContent>
      <IonFooter>
        <div className="caja-escribir">
          <IonTextarea
          clearOnEdit
            className="input-chat"
            name="texto"
            inputMode="text"
            rows={5}
            placeholder="Escribe algo..."
            maxlength={300}
            onIonChange={cogerMensaje}
          ></IonTextarea>
          <div className="botones">
            <IonButton className="icono-documento" fill="outline">
              <IonIcon icon={documentAttachOutline} size="medium"></IonIcon>
            </IonButton>
            <IonButton className="icono-camara" fill="outline">
              <IonIcon icon={cameraOutline} size="medium"></IonIcon>
            </IonButton>
            <IonButton
            
              onClick={enviarMensaje}
              className="icono-enviar"
              fill="outline"
            >
              <IonIcon
                className="icono-enviar"
                icon={send}
                size="medium"
              ></IonIcon>
            </IonButton>
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;
