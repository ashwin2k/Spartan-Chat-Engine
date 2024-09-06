import { Box, Sheet, Typography } from '@mui/joy';
import FileTile from './FileTile';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function FileUploadSideBar() {
    const { uploadedFiles } = useContext(AuthContext);

    return (
        <Sheet
            variant="outlined"
            color="neutral"
            className="min-w-72	h-screen bg-slate-600 flex flex-col justify-start content-center "
        >
            <Box className="h-5 max-h-5 mt-4 mb-4">
                {/* <FontAwesomeIcon className='h-5 w-4 mr-4'  icon={faFile} />  */}
                <Typography
                    textColor="neutral"
                    textAlign={'center'}
                    className="h-4"
                    level="title-lg"
                    component="span"
                >
                    {' '}
                    Files
                </Typography>
            </Box>
            {uploadedFiles.map((file) => (
                <FileTile
                    name={file.name}
                    time={new Date(file.timestamp).toLocaleString()}
                />
            ))}
        </Sheet>
    );
}
