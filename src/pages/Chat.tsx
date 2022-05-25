import { useState } from "react";
import { cameraOutline, send, documentAttachOutline } from "ionicons/icons";
import {
  IonButton,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Chat.css";

const Chat: React.FC = () => {
  const [mensajes, setMensajes] = useState(["estoy aqui", "y aqui"]);
  const [mensajeTexto, setMensajeTexto] = useState("Hola");

  const allMessajes = () => {
      

    return (
      <div className="conversacion">
        <p className="mensaje">{mensajes[0]}</p>
        <p>{mensajes[1]}</p>
      </div>
    );
  };

  const cogerMensaje = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setMensajeTexto(enteredName);
  };

  const enviarMensaje = () => {
    // e.preventDefault();
    console.log(mensajeTexto);
  };

  const valorTexto: string = "";

  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Chat con Ionic</IonTitle>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonTitle size="large">Chat</IonTitle>
        </IonHeader>
        {allMessajes()}
      </IonContent>
      <IonFooter>
        <div className="caja-escribir">
          <IonTextarea
            className="input-chat"
            name="texto"
            typeof="text"
            rows={5}
            placeholder="Escribe algo..."
            maxlength={300}
          ></IonTextarea>
          <div className="botones">
            <IonButton className="icono-documento" fill="outline">
              <IonIcon icon={documentAttachOutline} size="medium"></IonIcon>
            </IonButton>
            <IonButton className="icono-camara" fill="outline">
              <IonIcon icon={cameraOutline} size="medium"></IonIcon>
            </IonButton>
            <IonButton className="icono-enviar" fill="outline" >
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
