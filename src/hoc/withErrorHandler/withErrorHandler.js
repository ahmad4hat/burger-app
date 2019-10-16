import React from 'react';
import Modal from '../../components/UI/Modal/Modal'


let withErrorHandler=(WrappedComponent,axios)=>{
    return class extends React.Component{
        
        state={
            error:null
        }
        
        // errorSetter=(error)=>{
        //     this.setState({error:error})
        // }
        
        componentDidMount(){

            axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            });

            axios.interceptors.response.use(res => res , error => {

                this.setState({error:String(error)})
            });  

        }

        errorConfirmHandler=()=>{
            this.setState({error:null})
        }
        render(){
                return(
        
                    <React.Fragment>
                        <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
                            {this.state.error ? this.state.error:null}
                        </Modal>
                        <WrappedComponent {...this.props}/>
                    </React.Fragment>
                    
                );
            }   
    }
} 


export default withErrorHandler;