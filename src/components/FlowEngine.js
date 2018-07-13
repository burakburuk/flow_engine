import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import {rules} from '../rules';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {data} from '../data';
import FlowItem from "./FlowItem";
import objectHash from 'object-hash';

const styles = theme => ({
    root: {
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
    },
    panelRoot: {
        marginBottom: 10
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: '#FFFFFF'
    },
    trueColor: {
        backgroundColor: '#4CAF50'
    },
    falseColor: {
        backgroundColor: '#FF4081'
    },
});

class FlowEngine extends Component {
    visitedRules = [];

    runRule = (ruleId, data) => {
        try {
            const rule = rules.find(x => x.id === ruleId);
            if (rule === undefined) {
                throw new Error("Rule could not be found!");
            }
            const result = rule.body(data);
            if (result && rule.true_id !== null && rule.true_id !== ruleId) {
                this.visitedRules.push({
                    rule: rule,
                    nextExecution: true
                });
                return this.runRule(rule.true_id, data);
            } else if (rule.false_id !== null && rule.false_id !== ruleId) {
                this.visitedRules.push({
                    rule: rule,
                    nextExecution: false
                });
                return this.runRule(rule.false_id, data);
            } else {
                console.log("Next rule is null, Rules over");
                return;
            }
        } catch (error) {
            console.warn(error);
        }
    };

    render() {
        const {classes} = this.props;
        this.runRule(1, data);

        const ruleList = this.visitedRules.map(item => {
            return (
                <ExpansionPanel key={objectHash(item)} classes={{root: classes.panelRoot}}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}
                                           classes={{root: (item.nextExecution ? classes.trueColor : classes.falseColor)}}>
                        <Typography className={classes.heading}>{item.rule.id + " - " + item.rule.title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <FlowItem trueId={item.rule.true_id} falseId={item.rule.false_id}
                                  body={item.rule.body.toString()}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        });

        return (
            <div className={classes.root}>
                <Typography variant="display1" gutterBottom>
                    Flow Engine
                </Typography>
                {ruleList}
            </div>
        )
    }
}

FlowEngine.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlowEngine);