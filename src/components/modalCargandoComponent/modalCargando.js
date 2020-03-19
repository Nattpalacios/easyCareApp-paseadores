import React, {Component} from 'react';
import Modal from 'react-modal';


export default class ModalCargando extends Component{

    
    // constructor(props){
    //     super(props);
    // }




    render(){
        return (
            <Modal
            isOpen={this.props.modalIsOpen}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
              <center>
                <img src="/img/cargando.gif" alt="cargando" className="img img responsive" />
              </center>            

            </Modal>
        );
    }

}