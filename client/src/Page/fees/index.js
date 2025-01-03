
import React, { useState, useEffect } from 'react';
import SideBar from '../../Component/SideBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { studentfeesApi } from '../../api/student';
import { studentfeesconfirmApi } from '../../api/student';
import { Button, TextField } from '@mui/material';

function Payment() {
    const [amount, setAmount] = useState("");
    const [rollno,setRollno]=useState("");

    const [razorpay, setRazorpay] = useState(null); // State to hold the Razorpay instance

    // Error handling state
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeRazorpay = async () => {
            const options = {
                key: "rzp_test_sBhqWKhAFqYlBj", // Replace with your actual Razorpay Key ID
            };

            try {
                const rzp = new window.Razorpay(options);
                setRazorpay(rzp);
            } catch (err) {
                console.error("Error initializing Razorpay:", err);
                setError(err); // Store error for display
            }
        };

        initializeRazorpay();
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!razorpay) {
            console.error("Razorpay instance not yet initialized");
            return;
        }

        try {
            const response = await studentfeesApi(({ amount }))

            const order = response?.data?.data?.order;

            const options = {
                key: "rzp_test_sBhqWKhAFqYlBj",
                amount: order?.amount,
                name: "Acme Corp",
                description: "Test Transaction",
                order_id: order.id,
                theme: {
                    color: "#3399cc",
                },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open();

            var rzp1 = new window.Razorpay(options);
            rzp1.on('payment.success', async function (response) {
                try {
                    const addcApiResponse = await studentfeesconfirmApi();
                } catch (err) {
                    console.error('Error calling addcApi:', err);
                }
            });

            rzp1.on("payment.failed", function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();
            e.preventDefault();
            razorpay.open(options);

        } catch (err) {
            console.error("Error initiating payment:", err);
            setError(err); // Store error for display
        }
    };

    return (

        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
                <div>
                    <Typography variant="h4">Student Fee Payment</Typography>
                    <form onSubmit={handlePayment}>
                        <TextField
                            label="Roll No"
                            type="number"
                            value={rollno}
                            onChange={(e) => setRollno(e.target.value)}
                            required
                            variant="outlined"
                            sx={{ mb: 2, width: '100%' }}
                        />
                        <TextField
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            variant="outlined"
                            sx={{ mb: 2, width: '100%' }}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Pay Now
                        </Button>
                    </form>
                    {error && <Typography color="error">{error.message}</Typography>}
                </div>
            </Box>
        </Box>

    );
}

export default Payment;

// export default Payment;

