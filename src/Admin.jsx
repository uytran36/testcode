import React, { useEffect } from "react";
import { Button, Space, Form, Input, message, Upload, Switch } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./Admin.css";

const { TextArea } = Input;

const CustomAvatar = (props) => {
  return <img src={props.value} />;
};

const CustomSwitch = (props) => {
  return <Switch checkedChildren="Up" unCheckedChildren="Down" />;
};

const Admin = () => {
  const [form] = Form.useForm();
  const routesWatch = Form.useWatch("routes", form);
  const coinListWatch = Form.useWatch("coinList", form);
  const recentActivitiesWatch = Form.useWatch("recentActivities", form);
  const creditScoreWatch = Form.useWatch("creditScore", form);

  const propsUpload = {
    name: "file",
    action: "https://api.imgbb.com/1/upload",
    data: (file) => {
      return { key: "bd76800115deafd3015d107d402acdda", image: file };
    },
  };

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`${import.meta.env.VITE_API_MOCK}/routes`);
      const dataFetch = await result.json();
      form.setFieldsValue({
        routes: dataFetch.data[0].routes,
        creditScoreRankingTitle: dataFetch.data[0].creditScoreRankingTitle,
        creditScoreRanking: dataFetch.data[0].creditScoreRanking,
        creditScoreRankingText: dataFetch.data[0].creditScoreRankingText,
        creditScoreRankingBtn: dataFetch.data[0].creditScoreRankingBtn,
        creditScore: dataFetch.data[0].creditScore,
        coinList: dataFetch.data[0].coinList,
        recentActivitiesTitle: dataFetch.data[0].recentActivitiesTitle,
        recentActivities: dataFetch.data[0].recentActivities,
      });
    }
    fetchData();
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    const res = await fetch(`${import.meta.env.VITE_API_MOCK}/routes/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    console.log(res);
    message.success(`Update successfully`);
  };

  return (
    <div className="form-wrapper">
      <Form name="dynamic_form_item" form={form} onFinish={onFinish}>
        <Form.Item label={<div style={{ fontWeight: 700 }}>Routes</div>} />

        <Form.List name="routes">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item {...restField} name={[name, "name"]}>
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "icon"]}>
                    <CustomAvatar />
                  </Form.Item>
                  <Upload
                    {...propsUpload}
                    onChange={(info) => {
                      if (info.file.status !== "uploading") {
                        console.log(info.file, info.fileList);
                      }
                      if (info.file.status === "done") {
                        form.setFieldsValue({
                          routes: routesWatch.map((item, idx) => {
                            return {
                              ...item,
                              icon:
                                idx === index
                                  ? info.file.response.data.display_url
                                  : item.icon,
                            };
                          }),
                        });
                        message.success(
                          `${info.file.name} file uploaded successfully`
                        );
                      } else if (info.file.status === "error") {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          label={<div style={{ fontWeight: 700 }}>First card title</div>}
          name="creditScoreRankingTitle"
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label={<div style={{ fontWeight: 700 }}>Inside card name</div>}
          name="creditScoreRanking"
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label={<div style={{ fontWeight: 700 }}>Inside card text</div>}
          name="creditScoreRankingText"
        >
          <TextArea rows={4} placeholder="Button text" />
        </Form.Item>
        <Form.Item
          label={<div style={{ fontWeight: 700 }}>Inside card button</div>}
          name="creditScoreRankingBtn"
        >
          <Input placeholder="Button text" />
        </Form.Item>
        <Form.Item
          label={<div style={{ fontWeight: 700 }}>Credit score list</div>}
        />
        <Form.List name="creditScore">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item {...restField} name={[name, "name"]}>
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "icon"]}>
                    <CustomAvatar />
                  </Form.Item>
                  <Upload
                    {...propsUpload}
                    onChange={(info) => {
                      if (info.file.status !== "uploading") {
                        console.log(info.file, info.fileList);
                      }
                      if (info.file.status === "done") {
                        form.setFieldsValue({
                          creditScore: creditScoreWatch.map((item, idx) => {
                            return {
                              ...item,
                              icon:
                                idx === index
                                  ? info.file.response.data.display_url
                                  : item.icon,
                            };
                          }),
                        });
                        message.success(
                          `${info.file.name} file uploaded successfully`
                        );
                      } else if (info.file.status === "error") {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                  <Form.Item {...restField} name={[name, "score"]}>
                    <Input placeholder="Score" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "status"]}>
                    <Input placeholder="Status" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item label={<div style={{ fontWeight: 700 }}>Coin list </div>} />

        <Form.List name="coinList">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item {...restField} name={[name, "from"]}>
                    <Input placeholder="From" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "to"]}>
                    <Input placeholder="To" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "icon"]}>
                    <CustomAvatar />
                  </Form.Item>
                  <Upload
                    {...propsUpload}
                    onChange={(info) => {
                      if (info.file.status !== "uploading") {
                        console.log(info.file, info.fileList);
                      }
                      if (info.file.status === "done") {
                        form.setFieldsValue({
                          coinList: coinListWatch.map((item, idx) => {
                            return {
                              ...item,
                              icon:
                                idx === index
                                  ? info.file.response.data.display_url
                                  : item.icon,
                            };
                          }),
                        });
                        message.success(
                          `${info.file.name} file uploaded successfully`
                        );
                      } else if (info.file.status === "error") {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                  <Form.Item {...restField} name={[name, "value"]}>
                    <Input placeholder="Value" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "rate"]}>
                    <Input placeholder="Rate" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    valuePropName="checked"
                    name={[name, "raise"]}
                  >
                    <Switch checkedChildren="Up" unCheckedChildren="Down" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          label={<div style={{ fontWeight: 700 }}>Table title</div>}
          name="recentActivitiesTitle"
        >
          <Input placeholder="Title table" />
        </Form.Item>

        <Form.Item label={<div style={{ fontWeight: 700 }}>Table data</div>} />
        <Form.List name="recentActivities">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item {...restField} name={[name, "name"]}>
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "icon"]}>
                    <CustomAvatar />
                  </Form.Item>
                  <Upload
                    {...propsUpload}
                    onChange={(info) => {
                      if (info.file.status !== "uploading") {
                        console.log(info.file, info.fileList);
                      }
                      if (info.file.status === "done") {
                        form.setFieldsValue({
                          recentActivities: recentActivitiesWatch.map(
                            (item, idx) => {
                              return {
                                ...item,
                                icon:
                                  idx === index
                                    ? info.file.response.data.display_url
                                    : item.icon,
                              };
                            }
                          ),
                        });
                        message.success(
                          `${info.file.name} file uploaded successfully`
                        );
                      } else if (info.file.status === "error") {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                  <Form.Item {...restField} name={[name, "time"]}>
                    <Input placeholder="Time" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "status"]}>
                    <Input placeholder="Status" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "value"]}>
                    <Input placeholder="Value" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Admin;
