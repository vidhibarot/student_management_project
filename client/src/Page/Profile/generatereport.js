import React from 'react';
import { Container, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import { useUserDispatch } from '../../redux/dispatch/userdispatch';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import { useRef } from 'react';

const GenerateReport = (props) => {
  const data = props?.data
  const { setIsFormOpen } = useUserDispatch()


  const totalMarks = data?.marks?.reduce((acc, curr) => acc + curr.marks_obtained, 0);
  const maxMarks = data?.marks?.reduce((acc, curr) => acc + curr.total_marks, 0);
  const GenerateReportRef = useRef();

  const handleGenerateReport = async () => {
    const GenerateReportElement = GenerateReportRef.current;

    const canvas = await html2canvas(GenerateReportElement, { scale: 1 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [350, 500],
    });

    pdf.addImage(imgData, "PNG", 0, 0, 350, 500);

    pdf.save("Report.pdf");
  }

  const handleClose = () => {
    setIsFormOpen(false)
  }

  return (
    <Container maxWidth="sm">
      <Card variant="outlined" ref={GenerateReportRef}
      >
        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Student Report Card
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#02143A',
              color: "white",
              padding: '8px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '16px',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Typography variant="body2">Name: {data?.name}</Typography>
              <Typography variant="body2">Roll No: {data?.roll_no}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Dept: {data?.department?.name}</Typography>
              <Typography variant="body2">Div: {data?.division}</Typography>
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>Subject</TableCell>
                  <TableCell align="right" sx={{ color: '#fff' }}>Marks Obtained</TableCell>
                  <TableCell align="right" sx={{ color: '#fff' }}>Total Marks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.marks?.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>{subject?.subject}</TableCell>
                    <TableCell align="right">{subject?.marks_obtained}</TableCell>
                    <TableCell align="right">{subject?.total_marks}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell><strong>Total</strong></TableCell>
                  <TableCell align="right"><strong>{totalMarks}</strong></TableCell>
                  <TableCell align="right"><strong>{maxMarks}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center', display: "flex", marginTop: "13px", gap:"20px" }}>
        <Button variant="contained" color="primary" onClick={handleGenerateReport}>
          Generate PDF
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          close</Button>
      </Box>
    </Container>
  );
};

export default GenerateReport;




