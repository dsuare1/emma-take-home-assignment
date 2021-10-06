import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import style from './SearchForm.module.css';
import { getGistsForUser } from '../../restClient/actions';

const { Item } = Form;

const SearchForm = ({ renderClearButton, setGists }) => {
  const [form] = Form.useForm();

  const clearAll = () => {
    form.setFields([
      {
        name: 'username',
        value: null,
      }
    ]);

    setGists([]);
  };

  const onFinish = (values) => {
    const { username } = values;

    getGistsForUser(username)
      .then((res) => {
        console.log(res);
        const { data } = res;
        setGists(data);
      })
      .catch((err) => {
        console.error(err);
      })
  };

  const onChangeSearchInput = (e) => {
    const { value } = e.target;

    if (!value) {
      clearAll();
    }
  };

  const onClearResults = () => clearAll();

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Item name="username" label="Enter a GitHub username">
        <Input allowClear placeholder="dsuare1" onChange={onChangeSearchInput} />
      </Item>
      <div className={style.formFooter}>
        <Item>
          <Button type="primary">Get Gists</Button>
        </Item>
        {renderClearButton ? (
          <Item>
            <Button type="secondary" onClick={onClearResults}>Clear Results</Button>
          </Item>
        ) : null}
      </div>
    </Form>
  );
}

SearchForm.propTypes = {
  renderClearButton: PropTypes.bool.isRequired,
  setGists: PropTypes.func.isRequired,
};

export default SearchForm;
