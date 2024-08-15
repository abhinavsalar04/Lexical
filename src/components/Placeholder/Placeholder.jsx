import Box from '@mui/material/Box';

const Placeholder = ({className, children,}) => {

    return (
        <Box className={className}>{children}</Box>
    );
};

export default Placeholder;
