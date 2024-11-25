import React, { useState, useEffect } from "react";
import { Card, Button, Input, List, Typography, Modal, message } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function SuccessStories() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);

  // Buscar mensagens da API
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/mensagens`);
      if (!response.ok) throw new Error("Erro ao carregar mensagens.");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Criar nova mensagem
  const handleNewMessage = async () => {
    if (!newMessageContent) {
      message.warning("O conteúdo da mensagem não pode estar vazio.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/mensagens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conteudo: newMessageContent }),
      });
      if (!response.ok) throw new Error("Erro ao criar mensagem.");
      message.success("Mensagem criada com sucesso!");
      setNewMessageContent("");
      fetchMessages();
    } catch (error) {
      message.error(error.message);
    }
  };

  // Responder mensagem
  const handleReply = async () => {
    if (!replyContent) {
      message.warning("O conteúdo da resposta não pode estar vazio.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/mensagens/${selectedMessage.id}/responder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conteudo: replyContent }),
      });
      if (!response.ok) throw new Error("Erro ao enviar resposta.");
      message.success("Resposta enviada com sucesso!");
      setReplyContent("");
      setIsReplyModalVisible(false);
      fetchMessages();
    } catch (error) {
      message.error(error.message);
    }
  };

  // Curtir mensagem
  const handleLikeMessage = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/mensagens/${id}/curtir`, { method: "POST" });
      fetchMessages();
    } catch (error) {
      message.error("Erro ao curtir mensagem.");
    }
  };

  // Descurtir mensagem
  const handleDislikeMessage = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/mensagens/${id}/descurtir`, { method: "POST" });
      fetchMessages();
    } catch (error) {
      message.error("Erro ao descurtir mensagem.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={3}>Casos de Sucesso</Title>
      <Card>
        <TextArea
          rows={4}
          placeholder="Compartilhe sua história de sucesso..."
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
        />
        <Button type="primary" onClick={handleNewMessage} style={{ marginTop: "10px" }}>
          Publicar
        </Button>
      </Card>

      <List
        itemLayout="vertical"
        dataSource={messages}
        renderItem={(message) => (
          <Card
            style={{ marginTop: "20px" }}
            actions={[
              <Button type="link" onClick={() => setSelectedMessage(message)}>Responder</Button>,
              <Button type="link" onClick={() => handleLikeMessage(message.id)}>Curtir ({message.likes})</Button>,
              <Button type="link" onClick={() => handleDislikeMessage(message.id)}>Descurtir</Button>,
            ]}
          >
            <Card.Meta title={`Por: ${message.autor?.firstName || "Anônimo"}`} description={message.conteudo} />
            <List
              dataSource={message.respostas || []}
              renderItem={(reply) => (
                <Card size="small" style={{ marginTop: "10px" }}>
                  <p>{reply.conteudo}</p>
                  <p style={{ fontSize: "12px", color: "#888" }}>— {reply.autor?.firstName || "Anônimo"}</p>
                </Card>
              )}
            />
          </Card>
        )}
      />

      <Modal
        title="Responder Mensagem"
        visible={isReplyModalVisible}
        onCancel={() => setIsReplyModalVisible(false)}
        onOk={handleReply}
      >
        <TextArea
          rows={4}
          placeholder="Digite sua resposta..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default SuccessStories;
