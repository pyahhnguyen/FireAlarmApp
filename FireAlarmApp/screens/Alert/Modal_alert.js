import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RNModal from "react-native-modal";

const Modal = ({ isVisible = false, children, ...props }) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      {...props}
    >
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);
const ModalID = ({ title }) => (
 
    <Text style={styles.textid}>{title}</Text>
    

);
const ModalHeader = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.text}>{title}</Text>
    
  </View>
);

const ModalBody = ({ children }) => (
  <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: "#000",
    borderStyle: "solid",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 24,
  },
  textid: {
    paddingTop: 20,
    textAlign: "center",
    fontSize: 22,
    color: "#fc1717",
   
  },
  body: {
    justifyContent: "center",
    paddingHorizontal: 15,
    minHeight: 100,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
});


Modal.ID = ModalID;
Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
