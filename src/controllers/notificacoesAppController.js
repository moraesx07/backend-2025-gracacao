import { z } from "zod";
import {
  findAllNotificacoes,
  createNotificacao,
  updateNotificacao,
  removeNotificacao
} from "../models/notificacoesAppModel.js";

const NotificacaoSchema = z.object({
  usuario_id: z.number().min(1, "ID do usuário é obrigatório"),
  mensagem: z.string().min(1, "Mensagem é obrigatória"),
  data_notificacao: z.string().datetime({ message: "Data inválida" }),
  lida: z.boolean(),
});

export const createNotificacaoApp = async (req, res) => {
  try {
    NotificacaoSchema.parse(req.body);
    const result = await createNotificacao(req.body);
    res.status(201).json({
      message: "Notificação criada com sucesso!",
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

export const getNotificacoesApp = async (req, res) => {
  try {
    const notificacoes = await findAllNotificacoes();
    res.status(200).json({
      message: "Notificações encontradas com sucesso!",
      data: notificacoes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const patchNotificacaoApp = async (req, res) => {
  try {
    NotificacaoSchema.parse(req.body);
    const { id } = req.params;
    const result = await updateNotificacao(id, req.body);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Notificação não encontrada" });
    }
    res.status(200).json({ message: "Notificação atualizada com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro de validação", details: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar notificação" });
  }
};

export const deleteNotificacaoApp = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeNotificacao(id);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Notificação não encontrada" });
    }
    res.status(200).json({ message: "Notificação deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar notificação" });
  }
};