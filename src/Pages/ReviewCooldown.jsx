import classes from "./ReviewCooldown.module.css";

export default function ReviewCooldownPage() {
    return (
        <div className={classes.cointainerCooldown}>
            <div className={classes.tooMuch}>Za dużo opinii na raz!</div>
        </div>
    );
}
