import React, { Component } from 'react'
import { Consumer } from "../../context";
// import {v1 as uuid} from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

 class EditContact extends Component {

    state={
        name:'',
        email:'',
        phone:'',
        errors:{}
    }

    async componentDidMount(){
        const {id}=this.props.match.params;
        const res=await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)

        const contact=res.data;
        this.setState({
            name:contact.name,
            email:contact.email,
            phone:contact.phone
        })
    }

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value,
        })
    }

    onSubmit=async (dispatch,e)=>{
        e.preventDefault();

        const {name,email,phone}=this.state;
        const newContact={
            // id:uuid(),
            name,email,phone};

        //check errors
        if(name===''){
            this.setState({errors:{name:'Name is required'}})
            return;
        }

        if(email===''){
            this.setState({errors:{email:'Email is required'}})
            return;
        }

        if(phone===''){
            this.setState({errors:{phone:'Phone is required'}})
            return;
        }
        const updContact={
            name,email,phone
        }

        const {id}=this.props.match.params;

        const res=await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updContact)

        dispatch({type:'UPDATE_CONTACT',payload:res.data})

        this.setState({
            name:'',
            email:'',
            phone:'',
            errors:{}
            
    })

    this.props.history.push('/');
    }

    
    
    render() {

        const {name,email,phone,errors}=this.state;

        return(
            <Consumer>
                {value=>{
                    const {dispatch}=value;
                    return(
                        <div className='card mb-3'>
                            <div className='card-header'> Edit Contact </div>
                            <div className='card-body'>
                                <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                                    <TextInputGroup
                                    label='Name' error={errors.name} name='name' placeholder='enter name ...' value={name} onChange={this.onChange}
                                    />
                                    <TextInputGroup
                                    label='Email' error={errors.email} name='email' type='email' placeholder='enter email ...' value={email} onChange={this.onChange}
                                    />
                                    <TextInputGroup
                                    label='Phone' error={errors.phone} name='phone' placeholder='enter phone ...' value={phone} onChange={this.onChange}
                                    />
                                    <input type='submit'  value='Update Contact' className='btn btn-block btn-light'></input>
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default EditContact;