import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Box, Button } from "@mui/material";
import { useState, MouseEvent, ChangeEvent } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import { PostInfoType, NewCommentType } from '../interfaces'


interface PostDetailProps {
    info : PostInfoType;
};

export function PostDetail(props : PostDetailProps) {

    const [likeCnt, setLikeCnt] = useState<number>(props.info.likeCnt);
    const [commentList, setCommentList] = useState<string[]>(props.info.commentList);
    const [content, setContent] = useState<string>('');
    const [addBtnClicked, setAddBtnClicked] = useState<boolean>(false);
    const [likeBtnClicked, setLikeBtnClicked] = useState<boolean>(false);


    const likeBtnClickHandler = async (event : MouseEvent<HTMLElement>) => {
        event.stopPropagation();

        if(likeBtnClicked === true) {
            return;
        }
        setLikeBtnClicked(true)

        let result : string = (await axios.post('https://prosocial.heegh.store/like', JSON.stringify({post_id: props.info.postId}), {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        })).data;
        
        if(result !== 'success') {
            return;
        }
        
        setLikeCnt(Number(likeCnt) + 1);
    }

    const contentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    }

    const addBtnClickedHandler = async() => {
        setAddBtnClicked(true);
        
        if(content === '') {
            return;
        }

        const data : NewCommentType = {
            content : content,
            post_id: props.info.postId
        }

        let result : string = (await axios.post('https://prosocial.heegh.store/comment', JSON.stringify(data), {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        })).data;

        if(result !== 'success') {
            return;
        }

        let comments : string[] = (await axios.get('https://prosocial.heegh.store/comment', {
            params: {post_id: props.info.postId},
            withCredentials : true
        })).data.comments;

        console.log(comments)

        setCommentList(comments)
        setAddBtnClicked(false);
        setContent('')
    }

    return (    
        <>
            <Accordion sx={{width:'100%'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ transform: 'rotate(-90deg)'}}/>}
                    sx={{display:'flex',
                        flexDirection: 'row-reverse',   
                        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(90deg)'}
                    }}>
                    <Typography sx={{display: 'flex', alignItems: 'center', padding:'0.7rem 0.1rem',fontSize:'1rem', fontWeight:700,width:'75%'}}>
                        {props.info.title}
                    </Typography>
                    <Typography sx={{display: 'flex', alignItems: 'center', justifyContent:'center',
                        padding:'0.7rem 0.1rem', fontSize:'1rem',
                        width:'17.5%', borderLeft:'solid 1px rgba(0, 0, 0, .125)'}}>
                            {props.info.createdAt}
                    </Typography>
                    <Typography sx={{display: 'flex', alignItems: 'center', justifyContent:'center', 
                        padding:'0.7rem 0.1rem', fontSize:'1rem', 
                        width:'17.5%', borderLeft:'solid 1px rgba(0, 0, 0, .125)'}}
                        onClick={likeBtnClickHandler}>
                        &#128077; {likeCnt}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{minHeight:'5rem', borderTop:'solid 1px rgba(0, 0, 0, .125)', backgroundColor:'rgba(0, 0, 0, .125)'}}>
                    <Typography sx={{padding:'0.5rem', fontSize:'1.5rem'}}>
                        {props.info.content}
                    </Typography>                    
                </AccordionDetails>
                {commentList?.map(((comment, idx) => (
                        <Box key={idx} sx={{borderTop:'solid 1px rgba(0, 0, 0, .125)'}}>
                            <Typography sx={{padding:'1rem', fontSize:'0.8rem'}}>
                                {comment}
                            </Typography>
                        </Box>   
                    )))
                }
                <Box sx={{display:'flex', flexDirection:'row', width:'100%', height:'3rem',
                    borderTop:'solid 1px rgba(0, 0, 0, .125)'}}>
                    <TextField placeholder='댓글 입력' 
                        variant="standard"
                        sx={{width:'90%', margin:'auto', marginLeft:'1rem',borderRight:'solid 1px rgba(0, 0, 0, .125)'}}
                        onChange={contentChangeHandler}
                        value={content}
                        error={addBtnClicked && content === ''}
                        InputProps={{
                            disableUnderline: true,
                        }}>
                    </TextField>
                    <Button sx={{width: '10%'}} 
                        onClick={addBtnClickedHandler}>
                        댓글<br/>달기
                    </Button>
                </Box>
            </Accordion>
            <Box style={{marginTop:'5rem'}}></Box>
        </>
    )
}