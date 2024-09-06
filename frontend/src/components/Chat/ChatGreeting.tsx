import { Box, Typography } from '@mui/joy';

export function ChatGreeting() {
    return (
        <Box
            className="h-32 w-6/12 absolute top-1/3"
            sx={{ left: 'calc(25% + 5px)' }}
        >
            <Typography textAlign={'center'} level="h1">
                Greetings, Soldier. Welcome to the Spartan simulator.
            </Typography>
            <Typography className="pt-4" textAlign={'center'} level="body-md">
                Ask me <b><i>Anything.</i></b> I will do my best!
            </Typography>
        </Box>
    );
}
