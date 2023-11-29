import { useNavigate } from 'react-router-dom';
import { Box, Toolbar, Typography} from '@mui/material';
 
export function Header() {
    const navigate = useNavigate();

    const webTitleClickHandler = () => {
        navigate('/')
    };

    return (
        <Box sx={{mt:'2rem', mb:'2rem'}}>
            <Toolbar>
                <Typography 
                    variant="h4" 
                    component="div" 
                    sx={{ flexGrow: 1, textAlign:"center", cursor: "pointer", margin:'revert'}} 
                    color="primary.main"
                    onClick={webTitleClickHandler}>
                    친사회적 행동 프로젝트
                </Typography>
            </Toolbar>
            <Box sx={{mb:'2rem', mt:'3rem', border: "solid 0.1rem", borderColor:"primary.main"}}/>
        </Box>


    )
}