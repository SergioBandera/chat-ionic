import {
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Chat.css";

const Chat: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonTitle>Chat con Ionic</IonTitle>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonTitle size="large">Chat</IonTitle>
        </IonHeader>
        <IonIcon></IonIcon>
      </IonContent>
      <IonFooter>hola</IonFooter>
    </IonPage>
  );
};


export default Chat;
