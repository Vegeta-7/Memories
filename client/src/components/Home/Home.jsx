import React, { useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useNavigate, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyles from './styles';
import { useDispatch } from 'react-redux'
import { getPostsBySearch } from '../../actions/posts'

import Pagination from '../Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();  
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const searchPost = () => {
        if(search.trim() || tags){
            //dispatch -> fetch some posts
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            //search posts
            searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }
    
    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete))
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justify='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField name='search' variant='outlined' label='Search Memories' onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput style={{ margin: '10px 0px' }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label='Search Tags' variant='outlined'/>
                            <Button variant='contained' onClick={searchPost} className={classes.searchButton} color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home