# Generated by Django 4.0 on 2022-01-01 12:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0003_alter_profile_birth_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Configuration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gitRemoteRepo', models.CharField(max_length=300)),
                ('gitRemoteToken', models.CharField(max_length=120)),
                ('specificationReadmeFileName', models.CharField(max_length=300)),
                ('specificationDetailsFileName', models.CharField(max_length=300)),
                ('microbotReadmeFileName', models.CharField(max_length=300)),
                ('microbotDetailsFileName', models.CharField(max_length=300)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
            options={
                'verbose_name': 'configuration',
                'verbose_name_plural': 'configurations',
            },
        ),
    ]
