import styles from "@/components/Button/button.module.scss";
const Button = (props) => {
    const { label, tag, disabled, onClick = () => { }, className, testId } = props;
    const buttonClass = className ? className : null;
    const ButtonTag = tag === "button" ? "button" : null;
    return (
        <div className={styles.buttonWrapper}>
            <ButtonTag
                className={buttonClass}
                onClick={onClick}
                aria-label={`button ${label}`}
                disabled={disabled ? disabled : false}
                role={ButtonTag}
                data-testid={testId}
            >
                {label}
            </ButtonTag>
        </div>
    );
};

export default Button;