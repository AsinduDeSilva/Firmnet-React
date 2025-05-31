import React, { useState } from 'react';
import { Switch, FormControlLabel, Typography } from '@mui/material';

const Settings = () => {
    const [toggle, setToggle] = useState(true);
    const handleToggleChange = (event) => {
    setToggle(event.target.checked);
    };
    return (
        <div>
            <h2 className="text-4xl font-bold my-10 ml-5 text-[#d3d5de] w-[95%]">
                SETTINGS
            </h2>
            <div className="w-full max-w-3xl h-full bg-[#1e1e2b] mt-10 ml-5 rounded-md">
                <h2 className="text-xl font-bold mb-2 text-[#d3d5de] ml-5 p-5">
                    Network Mode
                </h2>
                <FormControlLabel
                    label={toggle ? 'Software Defined Network ' : 'Traditional Network '}
                    labelPlacement='start'
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            color: "#d3d5de", 
                            fontSize: '0.97rem',
                            marginLeft: '1.5rem', 
                            marginBottom: "1.5rem"
                        }
                        }}
                    control={
                    <Switch
                        checked={toggle}
                        onChange={handleToggleChange}
                        color="primary"
                        sx={{ ml: 5, mb: 2.5 }}
                    />
                    }
                />
            </div>     
        </div>
    )
}

export default Settings
