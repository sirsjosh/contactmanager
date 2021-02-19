import React, { Component } from 'react'
import { Consumer } from "../../context";
// import {v1 as uuid} from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

 class AddContact extends Component {

    state={
        name:'',
        email:'',
        phone:'',
        errors:{}
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

        const res=await axios.post('https://jsonplaceholder.typicode.com/users',newContact)
        
        dispatch({type:'ADD_CONTACT',payload:res.data})

        

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
                            <div className='card-header'> Add Contact </div>
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
                                    <input type='submit'  value='Add Contact' className='btn btn-block btn-light'></input>
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default AddContact;