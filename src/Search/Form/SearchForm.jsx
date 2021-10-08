import PropTypes from 'prop-types';
import { Button, Form, Input, Typography } from 'antd';
import { getPublicGists, getGistsForUser } from '../../restClient/api';
import style from './SearchForm.module.css';

const { Item } = Form;
const { Title } = Typography;

const SearchForm = ({ renderClearButton, setGists, setIsLoading }) => {
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

  const handleGetPublicGists = () => {
    setIsLoading(true);

    getPublicGists()
      .then((res) => {
        const { data } = res;
        setGists(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const onGetByUsernameFinish = (values) => {
    setIsLoading(true);
    const { username } = values;

    getGistsForUser(username)
      .then((res) => {
        const { data } = res;
        setGists(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const onClearResults = () => clearAll();

  return (
    <>
      <div className={style.inputsWrapper}>
        <div className={style.getPublicGistsWrapper}>
          <Title level={4}>Get Public Gists</Title>
          <Button className={style.getPublicButton} type="primary" onClick={handleGetPublicGists}>
            Get Public Gists
          </Button>
        </div>
        <Form layout="vertical" form={form} onFinish={onGetByUsernameFinish}>
          <Item name="username" label={<Title level={4}>Enter a GitHub username</Title>}>
            <Input allowClear placeholder="dsuare1" />
          </Item>
          <div className={style.formFooter}>
            <Item>
              <Button type="primary" htmlType="submit" className={style.formFooterItem}>
                Get Gists For User
              </Button>
            </Item>
            {renderClearButton ? (
              <Item>
                <Button type="secondary" onClick={onClearResults}>Clear Results</Button>
              </Item>
            ) : null}
          </div>
        </Form>
      </div>
    </>
  );
}

SearchForm.propTypes = {
  renderClearButton: PropTypes.bool.isRequired,
  setGists: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default SearchForm;
