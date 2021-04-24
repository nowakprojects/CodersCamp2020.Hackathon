import { Button, makeStyles } from '@material-ui/core';
import { THEME } from '../constants/ThemeMUI';

type TextButtonProps = {
  readonly text: string;
  onclick: () => {}
};

const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: 500,
    backgroundColor: `${THEME.palette.primary.main}`,
    color: `${THEME.palette.primary.contrastText}`,
    padding: '8px 25px',
    zIndex: 1,
  },
}));

const ClickButton = ({ text }: TextButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      size='large'
      onclick={}
      className={classes.button}
    >
      {text}
    </Button>
  );
};

export default ClickButton;