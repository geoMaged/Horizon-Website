import React, { useState, useContext} from 'react';
import Input from './Input';
import TextArea from './TextArea';
import Heading from './Heading';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {UserContext} from './UserContext';

function EditArticle({location}){

    console.log(location.state);

    const {state} = useContext(UserContext);
    const [article,setArticle] = useState({
        title:location.state.article.title,
        content:location.state.article.content
    });
    
    function handleClick(){
        
        console.log(state);
        axios.put('/api/articles/',{article, id:location.state.id},{
            headers:{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response =>{
                console.log(response);
            })
    }

    function editArticle(event){
        
        const {name,value} = event;
        setArticle( prevValue => {
            return(
                {
                    ...prevValue,
                    [name]:value
                }
            )
        });
    }


    return (
        <div>
            <Heading value='Be Creative' />
            <Input name='title' type='text' placeholder='Title' onEdit={editArticle} value={article.title}/><br/>
            <TextArea name='content' onEdit={editArticle} value={article.content} />
            <Link to='/home' >
                <button className='btn btn-lg btn-dark' onClick={handleClick}>Edit Article</button>
            </Link>
        </div>
    )
}

export default EditArticle;
