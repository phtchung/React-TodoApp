import {AppBar , Toolbar,IconButton, Typography, Stack,Button} from "@mui/material"
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

export const Navbar = () => {
    return(
        <AppBar position='static' >
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <CatchingPokemonIcon></CatchingPokemonIcon>
                </IconButton>
                <Typography variant='h6' component='div' sx={{flexGrow:1}}> Todo App</Typography>
                <Stack direction='row' spacing={2}>
                    <Button color='inherit'>Home</Button>
                    <Button color='inherit'>About</Button>

                </Stack>
            </Toolbar>
        </AppBar>
    )
}