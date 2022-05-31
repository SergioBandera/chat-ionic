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
  const [texto, setTexto] = useState<string>("");
 
  const cogerMensaje = (event: CustomEvent<TextareaChangeEventDetail>) =>
    setTexto(event.detail.value!);

  useEffect(() => {
    if (mensajeTexto && mensajeTexto.mensaje !== "") {
      if (mensajes == null) setMensajes([mensajeTexto!]);
      else setMensajes([...mensajes, mensajeTexto!]);
      setTexto("");
    }

  }, [mensajeTexto]);

  useEffect(() => {
    const chat =document.querySelector(".chat");
    chat!.scrollTop = chat!.scrollHeight;
  }, [mensajes, photos])
  
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

  const enviarMensajeTexto = () => {
    const data = Date().toLocaleString();
    const fecha = data.split(" ");

    setMensajeTexto({
      mensaje: texto!,
      UserPhoto: {
        filepath: "",
        webviewPath: "",
      },
      hora: fecha[4],
      dia: fecha[0],
    });
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
            <IonImg 
            src={UserPhoto.webviewPath}></IonImg>
          )}
        </IonList>
      ));
  };

  return (
    <div className="pagina">
      <div className="header">
        <IonTitle>Chat con Ionic</IonTitle>
      </div>
      <div className="chat">{mostrarMensajes()}</div>
        <div className="caja-escribir">
          <IonTextarea
            id="escribir-mensaje"
            value={texto}
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
    </div>
  );
};

export default Chat;
