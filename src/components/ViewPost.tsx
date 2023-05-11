import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Container, Stack, Typography, Paper } from "@mui/material"
import { PostInfoType } from "../interfaces";



export function ViewPost() {
    const { postId } = useParams();
    const [postInfo, setPostInfo] = useState<PostInfoType>({} as PostInfoType);

    const fetchPostInfo = async () => {
        // TODO HTTPS 
        let temp = Number(postId)
        console.log(temp)
        const data = {
            title: "ASDSADASDSDA",
            content : "QQQQQQQQQQQQQQ",
            like : temp
        };

        setPostInfo(data);
    }

    useEffect(() => {
        fetchPostInfo();
    }, [postId])



    return (
        <Container maxWidth='xl' sx={{ mt: 3, mb: 3}} >
            <Stack spacing={10} alignItems='center'>
                <Stack sx={{width:'80%'}}>

                    <Typography sx={{ margin: 'revert', fontSize: '2rem'}}>
                        {postInfo.title}
                    </Typography>
                    <Paper variant='outlined'
                        sx={{height:'30rem', padding:'1rem'}}>
                        {postInfo.content}
                    </Paper>
                    <Typography sx={{ margin: 'revert', fontSize: '2rem'}}>
                        좋아요 {postInfo.like}
                    </Typography>


                </Stack>
                

            </Stack>
        </Container>
    )
}