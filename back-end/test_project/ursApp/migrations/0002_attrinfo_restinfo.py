# Generated by Django 4.2 on 2023-05-07 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ursapp", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="AttrInfo",
            fields=[
                ("p_id", models.AutoField(primary_key=True, serialize=False)),
                ("p_name", models.CharField(max_length=100)),
                ("rating", models.IntegerField(null=True)),
                ("tags", models.CharField(blank=True, max_length=50)),
                ("address", models.CharField(blank=True, max_length=100)),
                ("url", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="RestInfo",
            fields=[
                ("p_id", models.AutoField(primary_key=True, serialize=False)),
                ("p_name", models.CharField(max_length=100)),
                ("rating", models.IntegerField(null=True)),
                ("tags", models.CharField(blank=True, max_length=50)),
                ("address", models.CharField(blank=True, max_length=100)),
                ("url", models.CharField(max_length=100)),
            ],
        ),
    ]
