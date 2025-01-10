import { Link, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Stack
      direction="row"
      justifyContent={{ xs: "center", md: "flex-end" }}
      ml={{ xs: 3.75, lg: 34.75 }}
      mr={3.75}
      my={3.75}
    >
      <Typography
        variant="subtitle2"
        fontFamily={"Poppins"}
        color="text.primary"
      >
        Crafted with dedication by{" "}
        <Link
          href="https://tijotjoseph.netlify.app"
          target="_blank"
          rel="noopener"
          sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}
        >
          hello_world.ttj
        </Link>
      </Typography>
    </Stack>
  );
};

export default Footer;
