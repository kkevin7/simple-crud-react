import React, { Component } from "react";
import db from "./../config/FirestoreConfig";
import { Table, Button, Row, Col, InputGroup, Input } from "reactstrap";

export class Todos extends Component {
  state = {
    items: [],
    inputValue: ""
  };

  componentDidMount() {
    db.collection("todos")
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
      const {inputValue} = this.state;
      db.collection('todos').add(
          { item: inputValue}
      ).then( () => {
          console.log('Agregado')
      }).catch( () =>{
          console.log('Error')
      })
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
                Agregar
              </Button>
            </div>
          </Col>
        </Row>
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
                      <Button color="warning">Editar</Button>
                    </td>
                    <td>
                      <Button color="danger">ELiminar</Button>
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
