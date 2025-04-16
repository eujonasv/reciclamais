import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { CollectionPoint, materialColors } from '@/types/collection-point';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  address: z.string().min(5, "O endereço deve ter pelo menos 5 caracteres"),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  phone: z.string().optional(),
  website: z.string().optional(),
  materials: z.array(z.string()).default([])
});

const AdminMap = () => {
  const [points, setPoints] = useState<CollectionPoint[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPoint, setEditingPoint] = useState<CollectionPoint | null>(null);
  const [open, setOpen] = useState(false);
  const [availableMaterials, setAvailableMaterials] = useState<string[]>(
    Object.keys(materialColors)
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      latitude: 0,
      longitude: 0,
      phone: "",
      website: "",
      materials: []
    },
  });

  const loadPoints = async () => {
    const { data, error } = await supabase.from("collection_points").select("*");
    if (error) {
      toast({
        title: "Erro ao carregar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setPoints(
        data.map((point) => ({
          ...point,
          materials: point.materials?.split(',').map(m => m.trim()) || []
        }))
      );
    }
  };

  useEffect(() => {
    loadPoints();
  }, []);

  const handleDeletePoint = async (id: string) => {
    const { error } = await supabase.from("collection_points").delete().eq("id", id);
    if (error) {
      toast({
        title: "Erro ao deletar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setPoints(points.filter((point) => point.id !== id));
      toast({ title: "Ponto deletado com sucesso" });
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      ...values,
      materials: values.materials.map(m => m.trim()).join(',')
    };

    let result;

    if (isEditing && editingPoint) {
      result = await supabase
        .from("collection_points")
        .update(payload)
        .eq("id", editingPoint.id);
    } else {
      result = await supabase.from("collection_points").insert(payload);
    }

    const { error } = result;

    if (error) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setOpen(false);
      setEditingPoint(null);
      setIsEditing(false);
      loadPoints();
      toast({ title: "Salvo com sucesso" });
    }
  };

  return (
    <div className="p-4">
      {/* Interface para formulário e lista de pontos */}
    </div>
  );
};

export default AdminMap;
