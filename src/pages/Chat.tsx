import { useEffect, useState } from "react";
import { cameraOutline, send, documentAttachOutline } from "ionicons/icons";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  TextareaChangeEventDetail,
} from "@ionic/react";
import "./Chat.css";
import { UserPhoto } from "../hooks/usePhotoGalery";
import { usePhotoGallery } from "../hooks/usePhotoGalery";

interface datosMensaje {
  mensaje: string;
  UserPhoto: UserPhoto;
  hora: string;
  dia: string;
}

const Chat: React.FC = () => {
  //useStates
  const [mensajes, setMensajes] = useState<Array<datosMensaje>>([]);
  const [mensajeTexto, setMensajeTexto] = useState<datosMensaje>();
  const { photos, takePhoto } = usePhotoGallery();
  


  useEffect(() => {
    console.log("ahora un render")
  }, [mensajes])
  
  useEffect(() => {
    if (photos) {
      const data = Date().toLocaleString();
      const fecha = data.split(" ");
      setMensajes([
        ...mensajes!,
        {
          mensaje: "",
          UserPhoto: {
            filepath: "",
            webviewPath: photos?.webviewPath,
          },
          hora: fecha[4],
          dia: fecha[0],
        },
      ]);
    }
  }, [photos]);

  const cogerMensaje = (event: CustomEvent<TextareaChangeEventDetail>) => {
    //coger dia y hora
    const data = Date().toLocaleString();
    const fecha = data.split(" ");

    setMensajeTexto({
      mensaje: event.detail.value!,
      UserPhoto: {
        filepath: "",
        webviewPath: "",
      },
      hora: fecha[4],
      dia: fecha[0],
    });

  };

  const enviarMensajeTexto = () => {
    if (mensajeTexto && mensajeTexto.mensaje !== "") {
      if (mensajes == null) setMensajes([mensajeTexto!]);
      else setMensajes([...mensajes!, mensajeTexto!]);
      

    } else console.log("el mensaje esta vacio");
  };

  //pintar todos los mensajes
  const mostrarMensajes = () => {
    if (mensajes !== null || mensajes !== undefined)
      return mensajes?.map(({ mensaje, UserPhoto, hora, dia }, index) => (
        <IonList className="caja-mensaje" key={index}>
          <p className="fecha">
            {dia} {hora}
          </p>
          <p className="mensaje">{mensaje}</p>
          {UserPhoto.webviewPath && (
            <IonImg src={UserPhoto.webviewPath}></IonImg>
          )}
        </IonList>
      ));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Chat con Ionic</IonTitle>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonTitle size="large">Chat</IonTitle>
        </IonHeader>
        <div className="chat">{mostrarMensajes()}</div>
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
            <IonButton
              onClick={takePhoto}
              className="icono-camara"
              fill="outline"
            >
              <IonIcon icon={cameraOutline} size="medium"></IonIcon>
            </IonButton>
            <IonButton
              onClick={enviarMensajeTexto}
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
