import { z } from "zod";
import {
  findAllMensagens,
  createMensagem,
  updateMensagem,
  removeMensagem
} from "../models/mensagensMqttModel.js";

const MensagemMqttSchema = z.object({
  sistema_id: z.number().min(1, "ID do sistema é obrigatório"),
  tipo_mensagem: z.string().min(1, "Tipo de mensagem é obrigatório"),
  payload: z.string().min(1, "Payload é obrigatório"),
  data_envio: z.string().datetime({ message: "Data inválida" }),
});

export const createMensagemMqtt = async (req, res) => {
  try {
    MensagemMqttSchema.parse(req.body);
    const result = await createMensagem(req.body);
    res.status(201).json({
      message: "Mensagem MQTT criada com sucesso!",
      id: result.lastInsertRowid,
      data: req.body,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro de validação", details: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const getMensagens = async (req, res) => {
  try {
    const mensagens = await findAllMensagens();
    res.status(200).json(mensagens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao recuperar mensagens" });
  }
};

export const patchMensagemMqtt = async (req, res) => {
  try {
    MensagemMqttSchema.parse(req.body);
    const { id } = req.params;
    const result = await updateMensagem(id, req.body);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Mensagem não encontrada" });
    }
    res.status(200).json({ message: "Mensagem atualizada com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro de validação", details: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar mensagem" });
  }
};

export const deleteMensagemMqtt = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeMensagem(id);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Mensagem não encontrada" });
    }
    res.status(200).json({ message: "Mensagem deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar mensagem" });
  }
};