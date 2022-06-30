import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";
import CardHeader from "@material-ui/core/CardHeader";

const FiCard = withStyles({
    root: {
        position: "relative"
    }
})(Card);

const FiCardActionArea = withStyles({
    root: {
        position: "relative"
    }
})(CardActionArea);

const FiCardActions = withStyles({
    root: {
        position: "relative"
    }
})(CardActions);

const FiCardContent = withStyles({
    root: {
        position: "relative",
        backgroundColor: "transparent"
    }
})(CardContent);

const FiCardHeader = withStyles({
    root: {
        position: "relative",
    }
})(CardHeader);

const FiCardMedia = withStyles({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: "100%"
    }
})(CardMedia);

// --- Exports --- //
export  {
    FiCard,
    FiCardActionArea,
    FiCardActions,
    FiCardContent,
    FiCardMedia,
    FiCardHeader,
};
