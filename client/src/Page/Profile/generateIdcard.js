import React, { useRef } from 'react';
import { Box, Typography, Grid, Avatar, Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";
import { useUserDispatch } from '../../redux/dispatch/userdispatch';

const GenerateIdCard = (props) => {
  const data = props?.data

  const GenerateIdCardRef = useRef();
  const { setIsFormOpen } = useUserDispatch()
  const handleGeneratePDF = async () => {
    const GenerateIdCardElement = GenerateIdCardRef.current;

    const canvas = await html2canvas(GenerateIdCardElement, { scale: 1 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [350, 500],
    });

    pdf.addImage(imgData, "PNG", 0, 0, 350, 500);

    pdf.save("ID_Card.pdf");
  };

  const handleClose = () => {
    setIsFormOpen(false)
  }
  return (
    <Box sx={{ paddingBottom: '2rem' }}>
      <Box
        ref={GenerateIdCardRef}
        sx={{
          border: '1px solid #ddd',
          width: 'fit-content',
          borderRadius: '10px',
          marginBottom: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: '#02143A',
            borderBottomLeftRadius: '50%',
            borderBottomRightRadius: '50%',
          }}
        >
          <Avatar
            src={data?.image}
            alt="photo"
            sx={{
              borderRadius: '50%',
              marginTop: '3rem',
              marginBottom: '-4rem',
              border: '10px solid #ddd',
              width: '100px',
              height: '100px',
            }}
          />
        </Box>

        <Box sx={{ padding: '1rem', marginTop: '3rem' }}>
          <Typography variant="h5" align="center" sx={{ textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            {data?.name}
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: "700" }}>
                Roll No:
              </Typography>
              <Typography variant="body2" sx={{ color: 'black', fontWeight: 500 }}>
                {data?.roll_no}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: "700" }}>
                Mobile:
              </Typography>
              <Typography variant="body2" sx={{ color: 'black', fontWeight: 500 }}>
                {data?.mobile}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: "700" }}>
                Division:
              </Typography>
              <Typography variant="body2" sx={{ color: 'black', fontWeight: 500, textTransform: 'lowercase' }}>
                {data?.division}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ textTransform: 'uppercase', fontWeight: "700" }}>
                Department:
              </Typography>
              <Typography variant="body2" sx={{ color: 'black', fontWeight: 500 }}>
                {data?.department?.name}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            backgroundColor: '#02143A',
            color: '#02143A',
            textAlign: 'center',
            padding: '0.3rem',
          }}
        >
          IDCARDD</Box>
      </Box>

      <Box sx={{ textAlign: 'center', display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleGeneratePDF}>
          Generate PDF
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          close </Button>
      </Box>
    </Box>
  );
}

export default GenerateIdCard;


