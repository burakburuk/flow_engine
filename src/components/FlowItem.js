import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class FlowItem extends Component {
    render() {
        const {trueId, falseId, body} = this.props;
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            label="Rule Body"
                            multiline
                            rowsMax="4"
                            fullWidth
                            value={body}
                            margin="normal"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="name"
                            label="Next rule-id if passed"
                            fullWidth
                            value={trueId}
                            margin="normal"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="name"
                            label="Next rule-id if failed"
                            fullWidth
                            value={falseId}
                            margin="normal"
                            disabled
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default FlowItem;