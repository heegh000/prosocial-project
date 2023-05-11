import { Container, Box, Button} from "@mui/material"
import { PostDetail } from "./PostDetail";
import { useNavigate } from "react-router"


export function Board() {

    const navigate = useNavigate();

    const addBtnClickHandler = () => {
        navigate('/add');
    }

    return (        
        <Container maxWidth='xl' sx={{ mt: 3, mb: 3, display:'flex', justifyContent:'center' }}>
            <Box style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%'}}>
                {/* <Box sx={{display:'flex', flexDirection:'row-reverse', width:'80%', mb:'2rem'}}> */}
                    <Button variant="outlined" 
                        sx={{height:'3.5rem', width:'50%', mb:'2rem'}}
                        onClick={addBtnClickHandler}>
                        글쓰기
                    </Button>
                {/* </Box> */}
                <PostDetail title='ASDASDAS' content='asdadasd' postId={123} likeCnt={1}></PostDetail>
                <PostDetail title='ASDASDAS' content='asdadasd' postId={123} likeCnt={1}></PostDetail>
                <PostDetail title='ASDASDAS' content='asdadasd' postId={123} likeCnt={1}></PostDetail>
                <PostDetail title='ASDASDAS' content='asdadasd' postId={123} likeCnt={1}></PostDetail>
            </Box>
        </Container>
    )
}