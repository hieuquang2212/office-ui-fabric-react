import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField, ITextField } from 'office-ui-fabric-react/lib/TextField';

export interface INumberTextFieldProps {
  label: string;
  initialValue: string;
}

export interface INumberTextFieldState {
  value: string;
}

export class NumberTextField extends React.Component<INumberTextFieldProps, INumberTextFieldState> {
  private _textField = React.createRef<ITextField>();

  constructor(props: INumberTextFieldProps) {
    super(props);

    this._restore = this._restore.bind(this);
    this._onChange = this._onChange.bind(this);
    this._validateNumber = this._validateNumber.bind(this);

    this.state = {
      value: props.initialValue
    };
  }

  public render(): JSX.Element {
    return (
      <div className="NumberTextField">
        <TextField
          className="NumberTextField-textField"
          label={this.props.label}
          value={this.state.value}
          onChange={this._onChange}
          onGetErrorMessage={this._validateNumber}
          componentRef={this._textField}
        />
        <div className="NumberTextField-restoreButton">
          <DefaultButton onClick={this._restore}>Restore</DefaultButton>
        </div>
      </div>
    );
  }

  private _validateNumber(value: string): string {
    return isNaN(Number(value)) ? `The value should be a number, actual is ${value}.` : '';
  }

  private _onChange(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void {
    return this.setState({
      value
    });
  }

  private _restore(): void {
    this.setState(
      {
        value: this.props.initialValue
      },
      () => {
        if (this._textField && this._textField.current) {
          this._textField.current.focus();
        }
      }
    );
  }
}
