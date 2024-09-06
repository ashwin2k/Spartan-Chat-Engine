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
            <Typography textAlign={'center'} level="body-md">
                Ask me <i>Anything.</i> I will do my best!
            </Typography>
        </Box>
    );
}
