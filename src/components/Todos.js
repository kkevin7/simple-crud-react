import React, { Component } from "react";
import db from "./../config/FirestoreConfig";
import { Table, Button, Row, Col, InputGroup, Input, Fade } from "reactstrap";

export class Todos extends Component {
  state = {
    items: [],
    inputValue: "",
    edit: false,
    id: "",
    fadeIn: false, 
    message: ""
  };

  componentDidMount() {
    db.collection("todos").orderBy("item", "desc")
      .onSnapshot(
        snapShots => {
          this.setState({
            items: snapShots.docs.map(doc => {
              return { id: doc.id, data: doc.data() };
            })
          });
        },
        err => {
          console.log(err);
        }
      );
  }

  changeValue = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  action = () => {
      const {inputValue, edit} = this.state;
      !edit ?
      db.collection('todos').add(
          { item: inputValue}
      ).then( () => {
        this.message('Registro Agregado');
          console.log('Agregado')
            this.setState({
                inputValue: ""
            })
      }).catch( () =>{
          console.log('Error')
          this.message('Error al agregar');
      }) :
      this.update()
  }

  getToDo = (id) => {
      let docRef = db.collection('todos').doc(id);
      docRef.get().then((doc) => {
          if(doc.exists){
              this.setState({
                  inputValue: doc.data().item,
                  edit: true,
                  id: doc.id
              })
          }else{
              console.log("El documento no existe");
          }
      }).catch((err) =>{
          console.log(err)
         
      });
  }

  update = () =>{
      const {id, inputValue} = this.state;
      db.collection('todos').doc(id).update({
          item: inputValue
      }).then(( )=>{
          console.log("Registro actualizado");
          this.setState({
              edit: false,
              inputValue: ""
          });
          this.message('Registro Actualizado');
      }).catch((err) => {
          console.log(err);
          this.message('Error al actualizar');
      })
  }

  deleteItem = (id) =>{
      if(window.confirm('¿Esta seguro de eliminar el registro?')){
    db.collection('todos').doc(id).delete();
      }
  }

  message = (message) =>{
      this.setState({
          fadeIn: true,
          message: message
      });

      setTimeout(() =>{
        this.setState({
            fadeIn: false,
            message: ""
        })
    }, 3000);
  }


  render() {
    const { items, inputValue } = this.state;
    return (
      <div>
        <Row>
          <Col xs="10">
            <InputGroup>
              <Input
                placeholder="Agregar un nuevo Item"
                value={this.state.inputValue}
                onChange={this.changeValue}
              ></Input>
            </InputGroup>
          </Col>
          <Col xs="2">
            <div className="text-center">
              <Button color="info" onClick={this.action}>
                {this.state.edit ? 'Editar' : 'Agregar'}
              </Button>
            </div>
          </Col>
        </Row>
        <Fade in={this.state.fadeIn} tag="h6" className="mt-3 text-center text-success">
            {this.state.message}
        </Fade>
        <br/>
        <Table hover className="text-center">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {items && items !== undefined
              ? items.map((item, key) => (
                  <tr key={key}>
                    <td>{item.data.item}</td>
                    <td>
                      <Button color="warning" onClick={ () => this.getToDo(item.id)}>Editar</Button>
                    </td>
                    <td>
                      <Button color="danger" onClick={ () => this.deleteItem(item.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Todos;
