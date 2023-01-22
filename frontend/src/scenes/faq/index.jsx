import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import "./faq.css"

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            An Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Not complete yet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            The Final Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Any question, pls send me email via the form below.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <div className="contact">
        <Header title="Contact Form" subtitle="Not Found An Answer, Contact Me" />
        <form style={{display:'flex', flexDirection: 'column', gap:'1rem'}} 
        action="https://formspree.io/f/mknagyzo" method="POST">
          <input type="text" name="Name" placeholder="Full Name" required ></input>
          <input type="email" name="Email" placeholder="Email" required></input>
          <textarea name="Messages" placeholder="Message" required></textarea>
          <button className="faqbutton"type="submit" style={{backgroundColor:colors.greenAccent[500] }}> Email Me</button>
        </form>
      </div>
    </Box>
  );
};

export default FAQ;
