import { Box, Typography, Card } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
function shortenString(str: String, maxLength: number) {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength - 3) + '...';
}

function FileTile({ time, name }: { time: string; name: string }) {
    return (
        <Card className="mt-4 ml-2 mr-2">
            <Box className="h-5 max-h-5 mt-2 mb-2  flex justify-around  content-center items-center">
                <FontAwesomeIcon className="h-5 w-5 mr-2" icon={faFile} />
                <Box className="flex-col">
                    <Typography
                        textColor="neutral"
                        className="items-center content-center"
                        level="body-lg"
                    >
                        {shortenString(name, 15)}
                    </Typography>
                    <Typography
                        textColor="neutral"
                        className="items-center content-center"
                        level="body-xs"
                    >
                        {' '}
                        Uploaded {time}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
}

export default React.memo(FileTile);
